export interface GeneralMessage {
  id?: number,
  isOblique?: number,
  message: string,
  type?: string,
  fromUrl?:boolean, 
}

export interface ColourScheme {
  colour1: string;
  colour2: string;
  colour3: string;
  colour4: string;
  colour5: string;
  id?: number
  fromUrl?: boolean
}

export interface SubjectsData {
  fromUrl?: boolean
  subject: string,
  id?: number
  isOblique?: number,
  type?: string,
  message?: string,
}

export interface Image {
  artistName: string
  artistProfileUrl: string
  colour: string
  description: string
  id: number
  imageTopics: Topic[]
  orientation: string
  unsplashId: string
  url: string
}

export interface Topic {
  id: number
  name: string
  pivot: {
    imageId: number
    imageTopicId: number
  }
  slug: string
  unsplashId: string
}

export interface ImageRequestPayload {
  orientation: string
  skipUnsplashApiCall: number
  topic?: string
  colour?: string
}