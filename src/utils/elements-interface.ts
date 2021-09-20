/**
 * The interfaces in this file are used to make sure our components
 * have the correct properties defined that are needed to pass to
 * the native HTML elements they render
 *
 * Add this @Props
*/
// /**
//    HTML <a> download attribute
//    */
//  @Prop() download: string | undefined;

//  /**
//   * HTML <a> href attribute
//   */
//  @Prop() href: string | undefined;

//  /**
//   * HTML <a> ref attribute
//   */
//  @Prop() rel: string | undefined;
// /**
//   * HTML <a> target attribute
//   */
//  @Prop() target: '_blank' | '_self' | '_parent' | '_top';
export interface AnchorInterface {
  href: string | undefined;
  target: string | undefined;
  rel: string | undefined;
  download: string | undefined;
}

export function generateAnchorAttributes(component: AnchorInterface): { [k: string]: any } {

  let attributes = {};

  attributes = component.href ? { ...attributes, href: component.href } : attributes;
  attributes = component.target ? { ...attributes, target: component.target } : attributes;
  attributes = component.rel ? { ...attributes, rel: component.rel } : attributes;
  attributes = component.download ? { ...attributes, download: component.download } : attributes;


  return Object.keys(attributes).length > 0 ? attributes : null;
}
