import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.css',
  shadow: true,
})
export class ColorPicker {
  @Element() el: HTMLElement;
  picker: HTMLDivElement;
  outputText: HTMLElement;

  @Prop() color: string = 'hsla(180, 50%, 50%, 100%)';

  @Watch('color')
  onColorChange(newColor: string) {
    const hslaParts = newColor.match(/^hsla\s*\(\s*([0-9]+(?:[.][0-9]*)?|[.][0-9]+)\s*,\s*([0-9]+(?:[.][0-9]*)?|[.][0-9]+)%\s*,\s*([0-9]+(?:[.][0-9]*)?|[.][0-9]+)%\s*,\s*([0-9]+(?:[.][0-9]*)?|[.][0-9]+)%\s*\)$/);
    if(!hslaParts) {
      throw new Error('Invalid HSLA color.');
    }

    this.hue = parseFloat(hslaParts[0]);
    this.saturation = parseFloat(hslaParts[1]);
    this.lightness = parseFloat(hslaParts[2]);
    this.alpha = parseFloat(hslaParts[3]);
  }

  @Event() colorChanged: EventEmitter<string>;

  @State() hue: number;
  @State() saturation: number;
  @State() lightness: number;
  @State() alpha: number;

  onHueChange(event) {
    this.hue = event.target.value;
    this.picker.style.setProperty(`--h`, `${this.hue}`);
    this.onHslaPartChanged();
  }

  onSaturationChange(event) {
    this.saturation = event.target.value;
    this.picker.style.setProperty(`--s`, `${this.saturation}%`);
    this.onHslaPartChanged();
  }

  onLightnessChange(event) {
    this.lightness = event.target.value;
    this.picker.style.setProperty(`--l`, `${this.lightness}%`);
    this.onHslaPartChanged();
  }

  onAlphaChange(event) {
    this.alpha = event.target.value;
    this.picker.style.setProperty(`--a`, `${this.alpha}%`);
    this.onHslaPartChanged();
  }

  componentDidLoad() {
    this.picker = this.el.shadowRoot.querySelector('.hsl-picker');
    this.outputText = this.el.shadowRoot.querySelector('.output-text');

    const currentHSLA = this.currentHSLA;
    this.outputText.innerText = currentHSLA;
  }

  private onHslaPartChanged() {
    const currentHSLA = this.currentHSLA;
    this.outputText.innerText = currentHSLA;
    this.colorChanged.emit(currentHSLA);
  }

  private get currentHSLA(): string {
    const styles = window.getComputedStyle(this.picker);
    return `
      hsla(${
        styles.getPropertyValue('--h')
      }, ${
        styles.getPropertyValue('--s')
      }, ${
        styles.getPropertyValue('--l')
      }, ${
        styles.getPropertyValue('--a')
      })
    `.trim();
  }

  render() {
    return (
      <div class="hsl-picker">
        <form>
          <label>
            Hue:
            <input type="range" min="0" max="360" step="0.1" value="{this.hue}" name="h" id="h" onInput={(event) => this.onHueChange(event)} />
          </label>

          <label>
            Saturation:
            <input type="range" min="0" max="100" step="0.1" value="{this.saturation}" name="s" id="s" onInput={(event) => this.onSaturationChange(event)}/>
          </label>

          <label>
            Lightness:
            <input type="range" min="0" max="100" step="0.1" value="{this.lightness}" name="l" id="l" onInput={(event) => this.onLightnessChange(event)}/>
          </label>

          <label>
            Alpha:
            <input type="range" min="0" max="100" step="0.1" value="{this.hue}" name="a" id="a" onInput={(event) => this.onAlphaChange(event)}/>
          </label>
        </form>
        <div class="output">
          <code class="output-text">
          </code>
        </div>
      </div>
    );
  }
}
