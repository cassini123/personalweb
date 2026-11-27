(function () {
  const state = {
    player: "james",
    role: "star",
    lastSkill: "drive",
    scoreUs: 98,
    scoreThem: 98,
    clip: 0,
    secondsLeft: 60,
    clipSeconds: 15,
    clipElapsed: 0,
    playRunning: false,
  };

  const playerImgs = {
    james: "assets/star-james.jpg",
    curry: "assets/star-curry.jpg",
    tatum: "assets/star-tatum.jpg",
    durant: "assets/star-durant.jpg",
  };

  const clips = [
    { title: "2016 Finals G7", sub: "0.4s 定格 · 可回看" },
    { title: "外线风暴", sub: "三分雨 · 15s" },
    { title: "突破撕扯", sub: "内线终结 · 15s" },
    { title: "空接终结", sub: "快攻扣篮 · 15s" },
  ];

  const skillCopy = {
    pass: { title: "传球改写成功", sub: "妙传空切 · +2 · 锁定领先", delta: 2 },
    drive: { title: "终场改写成功", sub: "突破上篮 · +2 · 加时锁定", delta: 2 },
    shoot: { title: "三分改写成功", sub: "超远三分 · +3 · 绝杀", delta: 3 },
    fake: { title: "假动作奏效", sub: "晃开防守 · 造犯规 · 罚中", delta: 2 },
  };

  let playTick = null;

  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

  function showScreen(id) {
    $all(".screen").forEach((s) => s.classList.remove("active"));
    const el = document.getElementById("screen-" + id);
    if (el) el.classList.add("active");

    const playMode = id === "play";
    document.body.classList.toggle("play-mode", playMode);
    document.body.classList.toggle("allow-portrait", playMode);

    const order = ["enter", "identity", "play", "result"];
    const idx = order.indexOf(id);
    $all(".flow-dot").forEach((d, i) => d.classList.toggle("active", i === idx));

    if (playMode) startPlay();
    else stopPlay();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prepareResult() {
    const c = skillCopy[state.lastSkill] || skillCopy.drive;
    $("#result-title").textContent = c.title;
    $("#result-sub").textContent = c.sub + " · 比分 " + state.scoreUs + "-" + state.scoreThem;
    $("#result-img").src = playerImgs[state.player] || playerImgs.james;
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const r = Math.max(0, s % 60);
    return m + ":" + String(r).padStart(2, "0");
  }

  function updateClipUI() {
    $all(".story-card").forEach((card, i) => {
      card.classList.toggle("on", i === state.clip);
    });
    const meta = $("#clip-meta");
    if (meta) meta.textContent = "Clip " + (state.clip + 1) + "/4 · " + Math.max(0, state.clipSeconds - Math.floor(state.clipElapsed)) + "s";
    const bar = $("#clip-progress");
    if (bar) bar.style.width = Math.min(100, (state.clipElapsed / state.clipSeconds) * 100) + "%";
    const onCard = $(".story-card.on");
    if (onCard) onCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function startPlay() {
    stopPlay();
    state.secondsLeft = 60;
    state.clip = 0;
    state.clipElapsed = 0;
    state.scoreUs = 98;
    state.scoreThem = 98;
    state.playRunning = true;
    $("#score-us").textContent = state.scoreUs;
    $("#score-them").textContent = state.scoreThem;
    $("#play-timer").textContent = formatTime(state.secondsLeft);
    $("#hud-action").textContent = "滑动摇杆移动 · 点技能出手";
    updateClipUI();

    playTick = setInterval(() => {
      if (!state.playRunning) return;
      state.secondsLeft -= 1;
      state.clipElapsed += 1;
      $("#play-timer").textContent = formatTime(state.secondsLeft);
      if (state.clipElapsed >= state.clipSeconds) {
        state.clip = (state.clip + 1) % clips.length;
        state.clipElapsed = 0;
      }
      updateClipUI();
      if (state.secondsLeft <= 0) {
        state.playRunning = false;
        prepareResult();
        showScreen("result");
      }
    }, 1000);
  }

  function stopPlay() {
    state.playRunning = false;
    if (playTick) { clearInterval(playTick); playTick = null; }
  }

  // navigation
  $all("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const go = btn.getAttribute("data-go");
      if (go === "result") prepareResult();
      showScreen(go);
    });
  });

  $all("#player-carousel .car-card").forEach((card) => {
    card.addEventListener("click", () => {
      $all("#player-carousel .car-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      state.player = card.getAttribute("data-player");
    });
  });

  $all(".role-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      $all(".role-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.role = pill.getAttribute("data-role");
    });
  });

  // skills
  $all("#skills .skill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const skill = btn.getAttribute("data-skill");
      state.lastSkill = skill;
      const c = skillCopy[skill];
      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"), 220);
      const fx = $("#court-fx");
      fx.classList.add("flash");
      setTimeout(() => fx.classList.remove("flash"), 250);
      state.scoreUs += c.delta;
      $("#score-us").textContent = state.scoreUs;
      $("#hud-action").textContent = c.sub;
      $("#clock-q").textContent = "Q4 00:" + String(Math.max(0, state.secondsLeft % 60)).padStart(2, "0");
    });
  });

  // virtual stick
  (function initStick() {
    const stick = $("#stick");
    const knob = $("#stick-knob");
    const court = $("#court-bg");
    if (!stick || !knob) return;
    const max = 34;
    let active = false;

    function setKnob(dx, dy) {
      const dist = Math.min(max, Math.hypot(dx, dy));
      const ang = Math.atan2(dy, dx);
      const x = Math.cos(ang) * dist;
      const y = Math.sin(ang) * dist;
      knob.style.transform = "translate(" + x + "px," + y + "px)";
      if (court) {
        const px = (x / max) * 4;
        const py = (y / max) * 3;
        court.style.transform = "scale(1.08) translate(" + (-px) + "%," + (-py) + "%)";
      }
    }

    function reset() {
      active = false;
      knob.style.transform = "translate(0,0)";
      if (court) court.style.transform = "scale(1.05)";
    }

    function point(e) {
      const t = e.touches ? e.touches[0] : e;
      const rect = stick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setKnob(t.clientX - cx, t.clientY - cy);
    }

    stick.addEventListener("pointerdown", (e) => {
      active = true;
      stick.setPointerCapture(e.pointerId);
      point(e);
    });
    stick.addEventListener("pointermove", (e) => { if (active) point(e); });
    stick.addEventListener("pointerup", reset);
    stick.addEventListener("pointercancel", reset);
  })();

  // toast
  const toast = $("#toast");
  function flashToast(msg) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = msg;
    clearTimeout(flashToast._t);
    flashToast._t = setTimeout(() => { toast.hidden = true; }, 1600);
  }
  $("#btn-save")?.addEventListener("click", () => flashToast("卡片已保存（演示）"));
  $("#btn-weibo")?.addEventListener("click", () => flashToast("分享预览 · 微博（演示）"));
  $("#btn-ali")?.addEventListener("click", () => flashToast("分享预览 · 阿里体育（演示）"));

  // deep link
  const params = new URLSearchParams(location.search);
  const start = params.get("screen") || "enter";
  if (start === "result") prepareResult();
  showScreen(start);
})();
