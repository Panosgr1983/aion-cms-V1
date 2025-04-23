// utils/showConfetti.ts

export function showConfetti() {
  if (typeof window === "undefined") return;

  try {
    const confettiCount = 100;
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9999",
    });
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      Object.assign(confetti.style, {
        position: "absolute",
        width: "10px",
        height: "10px",
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][Math.floor(Math.random() * 4)],
        borderRadius: "50%",
        top: "0",
        left: `${Math.random() * 100}%`,
      });
      container.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translate3d(0, 0, 0)", opacity: 1 },
          {
            transform: `translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 600 + 300}px, 0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1200 + Math.random() * 500,
          easing: "cubic-bezier(0,0,0.2,1)",
        }
      );

      animation.onfinish = () => {
        confetti.remove();
        if (container.childElementCount === 0) container.remove();
      };
    }
  } catch (err) {
    console.warn("🎉 Confetti Error:", err);
  }
}