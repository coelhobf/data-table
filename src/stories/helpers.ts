
export function textArg(name: string, description?: string): { [k: string]: any } {
  return stringArg('text', name, description);
}

export function colorArg(name: string, description?: string): { [k: string]: any } {
  return stringArg('color', name, description);
}

export function dateArg(name: string, description?: string): { [k: string]: any } {
  return stringArg('date', name, description);
}

export function stringArg(controlType: 'text' | 'color' | 'date', name: string, description?: string): { [k: string]: any } {
  const arg = {};
  arg[name] = {
    name: name,
    type: 'text',
    description: description,
    control: {
      type: controlType
    }
  }
  return arg;
}


export function numberArg(name: string, description?: string, options?: { min: number, max: number, step: number }, useSlider?: boolean): { [k: string]: any } {
  const arg = {};
  arg[name] = {
    name: name,
    type: 'number',
    description: description,

    control: {
      type: useSlider ? 'range' : 'number',
      ...options
    }
  }
  return arg;
}

export function rangeArg(name: string, description?: string, options?: { min: number, max: number, step: number }): { [k: string]: any } {
  return numberArg(name, description, options, true);
}

export function radioArg(name: string, options: { [name: string]: string }, description?: string, inline = true): { [k: string]: any } {
  return enumArg(inline ? 'inline-radio' : 'radio', name, options, description);
}

export function selectArg(name: string, options: { [name: string]: string }, description?: string): { [k: string]: any } {
  return enumArg('select', name, options, description);
}

export function multiSelectArg(name: string, options: { [name: string]: string }, description?: string): { [k: string]: any } {
  return enumArg('multi-select', name, options, description);
}


export function checkArg(name: string, options: { [name: string]: string }, description?: string, inline = true): { [k: string]: any } {
  return enumArg(inline ? 'inline-check' : 'check', name, options, description);
}

export function enumArg(controlType: 'radio' | 'inline-radio' | 'check' | 'inline-check' | 'select' | 'multi-select', name: string, options: { [name: string]: string }, description?: string): { [k: string]: any } {
  const arg = {};
  arg[name] = {
    options: Object.keys(options),
    name: name,
    type: 'text',
    description: description,
    control: {
      type: controlType,
      labels: options
    }
  }
  return arg;

}

export function boolArg(name: string, description?: string): { [k: string]: any } {
  const arg = {};
  arg[name] = {
    name: name,
    type: 'text',
    description: description,
    control: {
      type: "boolean",
    }
  }
  return arg;

}




