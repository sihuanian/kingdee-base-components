import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class KdButton extends KingdeeElement {
  @api disabled;
  @api label;
  @api tabIndex;
  @api title;
  @api stretch;
  @api variant = 'neutral'; // 按钮变体: brand、neutral(default)、base、brand-outline、destructive、destructive-text、success
  @api iconName;
  @api iconPosition = 'left';

  get computedClass() {
    const variantClz = this.variant !== 'base' ? `kdds-button kdds-button_${this.variant}` : '';
    const disabledBtnClz = this.disabled ? 'kdds-button_disabled' : '';
    const stretchClz = this.stretch ? 'kdds-button_stretch' : '';
    return `kdds-button ${variantClz} ${disabledBtnClz} ${stretchClz}`;
  }

  get showLeftIcon () {
    return Boolean(this.iconName) && this.iconPosition === 'left';
  }

  get showRightIcon () {
    return Boolean(this.iconName) && this.iconPosition === 'right';
  }

  get computedIconClass() {
    const iconPositionClass = this.iconPosition === 'left' ? 'kdds-button__icon_left' : 'kdds-button__icon_right';
    return `kdds-button__icon ${iconPositionClass}`
  }

  handleButtonFocus(event) {
    if (this.disabled) {
      return
    }
    // 阻止原生事件冒泡，只派发自定义事件
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('focus'));
  }

  handleButtonBlur(event) {
    if (this.disabled) {
      return
    }
    // 阻止原生事件冒泡，只派发自定义事件
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('blur'));
  }

  handleButtonClick(event) {
    // 阻止原生事件冒泡，只派发自定义事件
    event.stopPropagation();

    if (this.disabled) {
      return
    }
    this.dispatchEvent(new CustomEvent('click'));
  }
}
