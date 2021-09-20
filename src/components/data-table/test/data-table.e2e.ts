import { newE2EPage } from '@stencil/core/testing';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

describe('data-table', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: html
    });

    const element = await page.find('data-table');
    expect(element).toHaveClass('hydrated');
  });
});
