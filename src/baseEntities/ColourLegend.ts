import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'
import { ColourRange } from './ColourRange'

import { Entity, EntityConstructor, AttributesDescription } from '../types'


export type ColourLegendAttributes = {
    DefaultColor?: number
    ColourRange?: ColourRange[]
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: {
        name: 'ColourLegendId',
        type: 'xs:ID',
        isPrimaryId: true,
        isOptional: false,
        isOnlyV4: false
    },
    B: {
        name: 'DefaultColor',
        type: 'xs:unsignedByte',
        isPrimaryId: false,
        isOptional: true,
        isOnlyV4: false
    },
}
const CHILD_TAGS = {
    CRG: { name: 'ColourRange', isOnlyV4: false },
}

export class ColourLegend implements Entity {
    public tag = TAGS.ColourLegend

    constructor(public attributes: ColourLegendAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, internalId?: string, targetClass: EntityConstructor = ColourLegend): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS, internalId)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.ColourLegend, ColourLegend)