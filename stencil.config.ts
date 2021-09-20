import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'sample-project',
  globalStyle: 'src/styles.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: '../src/assets/',
          dest: 'assets/'
        }
      ]
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    { type: 'docs-json', file: 'docs.json' },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '../src/assets/',
          dest: 'assets/'
        }
      ]
    },
  ],
  plugins: [
    sass({
      includePaths: ["./node_modules/"],
    })
  ],
  testing: {
    screenshotConnector: './screenshot/connector.js',
    allowableMismatchedPixels: 200,
    pixelmatchThreshold: 0.05,
    waitBeforeScreenshot: 20,
    emulate: [
      {
        userAgent: "Desktop",
        viewport: {
          width: 1280,
          height: 720,
          deviceScaleFactor: 1,
          isMobile: false,
          hasTouch: false,
          isLandscape: false
        }
      },
      {
        userAgent: 'Mobile',
        viewport: {
          width: 320,
          height: 2000,
          deviceScaleFactor: 2,
          isMobile: true,
          hasTouch: true,
          isLandscape: false
        }
      }
    ]
  }
};
