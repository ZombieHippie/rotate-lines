
import { Rotator } from './rotator'

import { readFileSync, writeFileSync } from 'fs'

const contents = readFileSync('./in.txt', 'utf8')

const rot = Rotator.fromString(contents, 11)

rot.getRotations()
    .forEach((r, i) => {
        let t = r.slice(0, 1).toString()
        writeFileSync(`out/n${i}t.txt`, t, 'utf8')
        let fm = r.slice(1).toString()
        writeFileSync(`out/n${i}.txt`, fm, 'utf8')
    })
