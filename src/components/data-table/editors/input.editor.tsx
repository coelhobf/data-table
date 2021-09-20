import { h } from '@stencil/core';
import { RevoGrid, Edition } from '@revolist/revogrid/dist/types/interfaces';

/**
 * Exemplo de editor personalizado
 */
export class InputEditor implements Edition.EditorBase {
  public element: HTMLElement = null;
  public editCell: Edition.EditCell | null = null;

  /**
   *  @column: {ColumnDataSchemaRegular} - column data
   *  @editCallback: { (val) => void } - callback for finishing edit
   */
  constructor(
    public column: RevoGrid.ColumnRegular,
    private saveCallback: (value: Edition.SaveData, preventFocus?: boolean) => void,
    private closeCallback: (focusNext?: boolean) => void,
  ) {
    // Apenas para não dar erro no lint
    // this.saveCallback('');
  }

  // optional, called after editor rendered
  componentDidRender() {
    // this.element.setFocus();
  }

  // optional, called after editor destroyed
  disconnectedCallback() {
    this.closeCallback();
  }

  /**
   * required, define custom component structure
   * @param createElement: (tagName: string, properties?: object, value?: any, children: Array) => VNode
   */
  render() {
    return (
      <input
        type="text"
        ref={el => this.element = el}
        value={this.editCell.val}
        onChange={e => {
          this.saveCallback((e.target as HTMLInputElement).value);
          this.closeCallback(true);
        }}
        // onSyInputDidChange={e => {
        //   console.log('onSyInputDidChange', e.detail.value)
        //   this.saveCallback(e.detail.value);
        // }}
        // onSyInputDidFocus={() => {
        //   console.log('onSyInputDidFocus');
        // }}
        // onSyInputDidBlur={() => {
        //   console.log('onSyInputDidBlur');
        // }}
      />
    );
  }
}
