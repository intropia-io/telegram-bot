const tg = window.Telegram.WebApp;
const Tg = window.Telegram

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    tg,
    Tg,
    user: tg.initDataUnsafe?.user,
  };
}
