import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class KdIcon extends KingdeeElement {
  @api iconName;
  @api size = 'medium'; // medium(default - 32*32)、small(24*24)、x-small(16*16)、xx-small(14*14)、large(48*48)
  @api fillColor;
  @api title;
  @api svgClass;

  get iconPath() {
    return `./assets/icons.svg#icon-${this.iconName}`;
  }

  get computedContainerStyle () {
    // TODO: 校验输入值
    if (!this.fillColor) return
    return `color: ${this.fillColor}`
  }

  get computedIconClass() {
    return `kdds-icon kdds-icon--${this.size} ${this.svgClass}`;
  }

  connectedCallback() {}
  renderedCallback() {}
  disconnectedCallback() {}
}
