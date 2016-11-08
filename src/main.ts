
import { Rotator } from './rotator'

import { readFileSync, writeFileSync } from 'fs'

const contents = readFileSync('./in.txt', 'utf8')

const rot = Rotator.fromString(contents, 11)

rot.getRotations()
    .forEach((r, i) => {
        let fm = r.toFormatString()
        writeFileSync(`out/n${i}.txt`, fm, 'utf8')
    })
