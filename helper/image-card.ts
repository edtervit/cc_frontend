export interface selectedColourObject {
  hex: string;
  slug: string;
}

export function colourSwitch(colour: string) {
  switch (colour) {
    case '#808080':
      return {
        hex: colour,
        slug: 'black_and_white',
      }
    case '#000000':
      return {
        hex: colour,
        slug: 'black',
      }
    case '#ffffff':
      return {
        hex: colour,
        slug: 'white',
      }
    case '#ffff00':
      return {
        hex: colour,
        slug: 'yellow',
      }
    case '#ffa500':
      return {
        hex: colour,
        slug: 'orange',
      }
    case '#ff0000':
      return {
        hex: colour,
        slug: 'red',
      }
    case '#800080':
      return {
        hex: colour,
        slug: 'purple',
      }
    case '#ff00ff':
      return {
        hex: colour,
        slug: 'magenta',
      }
    case '#008000':
      return {
        hex: colour,
        slug: 'green',
      }
    case '#008080':
      return {
        hex: colour,
        slug: 'teal',
      }
    case '#0000ff':
      return {
        hex: colour,
        slug: 'blue',
      }
  
    default:
      return null
  }
}