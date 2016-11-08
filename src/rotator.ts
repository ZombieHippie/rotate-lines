
export
class Rotator {
    constructor (private groups: string[][]) {}

    info(): string {
        const message =
`Indexes: ${this.groups.map(l => l.length).join(', ')}`
        return message
    }

    private static getDivisions(len: number, parts: number): number[] {
        const diff = (len % parts)
        const groupSize = (len - diff) / parts
        const oneLarger = .5 > diff / parts

        const lastGroup = oneLarger ? groupSize + diff : diff

        const indexes = new Array(parts - 1).fill(groupSize).concat([lastGroup])
        
        return indexes
    }

    slice(start: number, end?: number): string[][] {
        return this.groups.slice(start, end)
    }

    rotate(): Rotator {
        return new Rotator([...this.slice(1), ...this.slice(0, 1)])
    }

    getRotations() {
        var curr = <Rotator> this
        const res = new Array(this.length).fill(null)
            .map(_ => { curr = curr.rotate(); return curr })
        return res
    }

    get length(): number {
        return this.groups.length
    }

    toString() {
        return this.groups.map(lns => lns.join('\n')).join('\n')
    }

    toFormatString() {
        return this.groups.map(lns => lns.join('\n')).join('\n\n')
    }

    static fromString(contents: string, parts = 10) {
        const lines = contents.split(/\r?\n/g).filter(str => /\w/.test(str))
        return Rotator.fromLines(lines, parts)
    }

    static fromLines(lines: string[], parts = 10) {
        const len = lines.length
        const divs = Rotator.getDivisions(len, parts)
        
        let start = 0
        const groups = divs.map(d => {
            const res = lines.slice(start, start + d)
            start += d
            return res
        })

        return new Rotator(groups) 
    }
}
