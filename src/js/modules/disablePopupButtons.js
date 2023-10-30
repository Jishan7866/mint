import {
  selectAll
} from './helpers';

export default $ => {
  const disableButton = e => {
    const buttons = selectAll('.ui-dialog .btn');
    buttons.forEach(button => {
      button.classList.add('is-disabled-strong');
    });
  }

  $(document).ajaxStart(disableButton)
}
