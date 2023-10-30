export default function closeMyAccountPopup() {

  const close = e => {
    const {
      origin,
      pathname
    } = location;

    const closeButton = e.target.closest('.ui-dialog-titlebar-close');
    if (!closeButton) return;

    const successPopup = closeButton.closest('.my-account-popup--success');
    if (!successPopup) return;

    for (let className of successPopup.classList) {
      if (className.indexOf('to-') === -1) continue;
      className = className.replace('to-', '#');
      history.pushState(null, '', `${origin + pathname + className}`);
    }

    location.reload();
  }

  document.addEventListener('click', close);
}
