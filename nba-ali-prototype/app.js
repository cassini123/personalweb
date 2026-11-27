(function () {
  const state = {
    player: "james",
    role: "star",
    action: "drive",
    strategy: "pace",
    resultType: "past",
  };

  const playerImgs = {
    james: "assets/player-lakers.svg",
    curry: "assets/player-warriors.svg",
    tatum: "assets/player-celtics.svg",
  };

  const actionCopy = {
    pass: { title: "传球改写成功", sub: "妙传空切 · +2 · 锁定领先" },
    drive: { title: "终场改写成功", sub: "突破上篮 · +2 · 加时锁定" },
    three: { title: "三分改写成功", sub: "超远三分 · +3 · 绝杀" },
    fake: { title: "假动作奏效", sub: "晃开防守 · 造犯规 · 罚中" },
  };

  const strategyCopy = {
    pace: { title: "外线风暴 · 预测成片", sub: "三分命中率↑ · 模拟胜场" },
    paint: { title: "内线绞杀 · 预测成片", sub: "禁区统治 · 模拟胜场" },
    fast: { title: "防守反击 · 预测成片", sub: "转换得分↑ · 模拟胜场" },
  };

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    const el = document.getElementById("screen-" + id);
    if (el) el.classList.add("active");

    document.querySelectorAll(".flow-dot").forEach((d) => {
      const target = d.getAttribute("data-go");
      const map = {
        enter: "enter",
        identity: "identity",
        mode: "mode",
        "interact-past": "interact-past",
        "interact-future": "interact-past",
        result: "result",
      };
      const key = map[id] || id;
      d.classList.toggle("active", target === key || (id === "interact-future" && target === "interact-past") || (id.startsWith("interact") && target === "interact-past" && key === "interact-past"));
    });

    // refine flow dots
    const order = ["enter", "identity", "mode", "interact-past", "result"];
    let activeIdx = order.indexOf(id);
    if (id === "interact-future") activeIdx = 3;
    document.querySelectorAll(".flow-dot").forEach((d, i) => {
      d.classList.toggle("active", i === activeIdx);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prepareResult(type) {
    state.resultType = type || state.resultType;
    const title = document.getElementById("result-title");
    const sub = document.getElementById("result-sub");
    const img = document.getElementById("result-img");
    img.src = playerImgs[state.player] || playerImgs.james;

    if (state.resultType === "future") {
      const c = strategyCopy[state.strategy] || strategyCopy.pace;
      title.textContent = c.title;
      sub.textContent = c.sub;
    } else {
      const c = actionCopy[state.action] || actionCopy.drive;
      title.textContent = c.title;
      sub.textContent = c.sub;
    }
  }

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const go = btn.getAttribute("data-go");
      if (btn.hasAttribute("data-result")) {
        prepareResult(btn.getAttribute("data-result"));
      }
      if (go === "result" && !btn.hasAttribute("data-result")) {
        prepareResult(state.resultType);
      }
      showScreen(go);
    });
  });

  document.querySelectorAll("#player-carousel .car-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll("#player-carousel .car-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      state.player = card.getAttribute("data-player");
    });
  });

  document.querySelectorAll(".role-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".role-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.role = pill.getAttribute("data-role");
    });
  });

  document.querySelectorAll("#action-pills button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#action-pills button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      state.action = b.getAttribute("data-action");
    });
  });

  document.querySelectorAll("#strategy-pills button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#strategy-pills button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      state.strategy = b.getAttribute("data-strategy");
    });
  });

  document.querySelectorAll("#lineup .slot").forEach((slot) => {
    slot.addEventListener("click", () => {
      slot.classList.toggle("on");
    });
  });

  const toast = document.getElementById("toast");
  function flashToast(msg) {
    toast.hidden = false;
    toast.textContent = msg;
    clearTimeout(flashToast._t);
    flashToast._t = setTimeout(() => { toast.hidden = true; }, 1800);
  }
  document.getElementById("btn-save")?.addEventListener("click", () => flashToast("卡片已保存（演示 · 已验证链路）"));
  document.getElementById("btn-weibo")?.addEventListener("click", () => flashToast("已打开分享预览 · 微博（演示）"));
  document.getElementById("btn-ali")?.addEventListener("click", () => flashToast("已打开分享预览 · 阿里体育（演示）"));

  const params = new URLSearchParams(location.search);
  const start = params.get("screen") || "enter";
  if (start === "result") prepareResult(params.get("result") || "past");
  showScreen(start);
})();
