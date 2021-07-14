import { Component, Element, h, State } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.css',
  shadow: true,
})
export class ColorPicker {
  @Element() el: HTMLElement;
  picker: HTMLDivElement;
  outputText: HTMLElement;

  @State() hue: number = 180;
  @State() saturation: number = 50;
  @State() lightness: number = 50;
  @State() alpha: number = 100;

  onHueChange(event) {
    this.hue = event.target.value;
    this.picker.style.setProperty(`--h`, `${this.hue}`);
    this.updateOutputText();
  }

  onSaturationChange(event) {
    this.saturation = event.target.value;
    this.picker.style.setProperty(`--s`, `${this.saturation}%`);
    this.updateOutputText();
  }

  onLightnessChange(event) {
    this.lightness = event.target.value;
    this.picker.style.setProperty(`--l`, `${this.lightness}%`);
    this.updateOutputText();
  }

  onAlphaChange(event) {
    this.alpha = event.target.value;
    this.picker.style.setProperty(`--a`, `${this.alpha}%`);
    this.updateOutputText();
  }

  componentDidLoad() {
    this.picker = this.el.shadowRoot.querySelector('.hsl-picker');
    this.outputText = this.el.shadowRoot.querySelector('.output-text');
    this.updateOutputText();
  }

  private updateOutputText() {
    const styles = window.getComputedStyle(this.picker);

      this.outputText.innerText = `
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
            <input type="range" value="{this.hue}" min="0" max="360" step="0.1" name="h" id="h" onInput={(event) => this.onHueChange(event)} />
          </label>

          <label>
            Saturation:
            <input type="range" value="{this.saturation}" min="0" max="100" step="0.1" name="s" id="s" onInput={(event) => this.onSaturationChange(event)}/>
          </label>

          <label>
            Lightness:
            <input type="range" value="{this.lightness}" min="0" max="100" step="0.1" name="l" id="l" onInput={(event) => this.onLightnessChange(event)}/>
          </label>

          <label>
            Alpha:
            <input type="range" value="{this.hue}" min="0" max="100" step="0.1" name="a" id="a" onInput={(event) => this.onAlphaChange(event)}/>
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
