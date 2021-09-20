import { Component, Host, h, ComponentInterface, State, Element, Prop, Listen } from '@stencil/core';
import { defineCustomElements } from '@revolist/revogrid/loader';
import '@revolist/revogrid';
import { RevoGrid, Edition } from '@revolist/revogrid/dist/types/interfaces';
import { InputEditor } from './editors/input.editor';
import ListenerTracker from './listenerTacker';
// import retargetEvents from './retarget';

@Component({
  tag: 'data-table',
  styleUrl: 'data-table.scss',
  shadow: true,
})
export class DataTable implements ComponentInterface {
  @Prop() height = '500px';

  @Element() el: HTMLDataTableElement;
  @State() grid: HTMLRevoGridElement = null;

  @State() columns: RevoGrid.ColumnData;
  @State() source: RevoGrid.DataSource;
  @State() editors: Edition.Editors;

  componentWillLoad() {
    ListenerTracker.init();
    defineCustomElements(window, {
      ael: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => {
        console.log('ael on stencil!');
        el.addEventListener(eventName, listener, options);
      },
    });
    // defineCustomElements();
    // console.log(defineCustomElements);

    this.columns = [
      {
        prop: 'name',
        name: 'First',
      },
      {
        prop: 'details',
        name: 'Second',
        editor: 'input',
        order: 'desc',
        sortable: true,
        columnTemplate: (h, column) => {
          return <div>Teste nome coluna {column.name}</div>;
        },
      },
    ];

    this.source = [
      {
        name: 'New item1',
        details: 'Item description1',
      },
      {
        name: 'New item2',
        details: 'Item description2',
      },
      {
        name: 'New item3',
        details: 'Item description3',
      },
      {
        name: 'New item4',
        details: 'Item description4',
      },
      {
        name: 'New item5',
        details: 'Item description5',
      },
    ];

    this.editors = {
      input: InputEditor,
    };
  }

  componentDidLoad() {
    // retargetEvents(this.el.shadowRoot);
    // retargetEvents(this.el.shadowRoot, ['mousedown', 'dblclick']);
  }

  @Listen('dblclick')
  dblclickListener(e: any & Event) {
    // console.log('hello! dblclick', e)
    if(!e.isTrusted) return;

    // console.log(e.composedPath());
    let cell: HTMLDivElement = e.path[0];
    let col = cell.getAttribute('data-rgcol');
    let row = cell.getAttribute('data-rgrow');

    this.grid.getColumns().then(columns => {
      this.grid.setCellEdit(parseInt(row), columns[col].prop);
    });

    // let cell: HTMLDivElement = e.composedPath()[0];
    // cell.dispatchEvent(new e.constructor(e.type, Object.assign({}, e,
    //   { bubbles: true, composed: true, cancelable: false })));
  }

  // @Listen('mousedown')
  // async mousedownListener(e: any & Event) {
  //   // console.log('component hello! mousedown', e)
  //   if(!e.isTrusted) return;

  //   let cell: HTMLDivElement = e.composedPath()[0];
  //   cell.dispatchEvent(new e.constructor(e.type, Object.assign({}, e,
  //     { bubbles: true, composed: true, cancelable: false })));
  // }

  render() {
    const style = {
      width: '100%',
      height: this.height,
    };

    return (
      <Host style={style}>
        <revo-grid
          ref={el => (this.grid = el)}
          style={style}
          columns={this.columns}
          source={this.source}
          editors={this.editors}
          // autoSizeColumn={true}
          resize={true}
          // onBeforeedit={e => console.log('onBeforeedit', e)}
          // onBeforeeditstart={e => console.log('onBeforeeditstart', e)}
          // onAfteredit={e => console.log('onAfteredit', e)}
        ></revo-grid>
      </Host>
    );
  }
}
