import { newSpecPage } from '@stencil/core/testing';
import { ColorPicker } from './color-picker';

describe('color-picker', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ColorPicker],
      html: '<color-picker></color-picker>',
    });
    expect(root).toEqualHtml(`
      <color-picker>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </color-picker>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [ColorPicker],
      html: `<color-picker first="Stencil" last="'Don't call me a framework' JS"></color-picker>`,
    });
    expect(root).toEqualHtml(`
      <color-picker first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </color-picker>
    `);
  });
});
