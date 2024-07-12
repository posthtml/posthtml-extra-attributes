type PluginOptions = {
  /**
  An object defining which elements should get what attributes.

  @default {}

  @example
    {
      table: {
        cellpadding: 0,
        cellspacing: 0,
        role: 'none'
      },
      img: {
        alt: ''
      },
    }
  */
  attributes?: {
    [tagName: string]: {
      [attribute: string]: string | number;
    };
  };

  /**
   * Overwrite existing attribute values.
   *
   * @default false
   *
   * @example
   * {
   *  overwrite: true
   * }
  */
  overwrite?: boolean;
};

export type { PluginOptions };
