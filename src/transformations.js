export function transform(template) {
    const transformations = Object.entries(template).map(([left, right]) => {
        if (typeof right == 'string') {
            return [left, oneToOne(right)]
        } else {
            return [left, right]
        }
    })

    return function(obj, reverse = false) {
        const direction = reverse ? 'backward' : 'forward'
        const parts = transformations.map(([leftName, fnObj]) => {
            return fnObj[direction](obj, leftName)
        })
        // merge all the parts into a single Object
        return Object.assign(...parts)
    }
}

export function isDefined(value) {
    return typeof value != 'undefined' && value != null
}

export function oneToOne(right) {
    return {
        forward: (obj, left) => propIfValue(left, obj[right]),
        backward: (obj, left) => propIfValue(right, obj[left]),
    }

    function propIfValue(propName, value) {
        const result = {}
        if (isDefined(value)) result[propName] = value
        return result
    }
}

export function textHtml(textName, htmlName, required = false) {
    if (!htmlName) htmlName = textName + '_html'

    return {
        forward(obj, leftPropName) {
            const result = {}
            const { [htmlName]: html, [textName]: text } = obj
            if (html) result[leftPropName] = html.trim()
            else if (text) result[leftPropName] = text.trim()
            else if (required) result[leftPropName] = ''
            // else just return empty object

            return result
        },
        backward(obj, leftPropName) {
            const result = {}
            const value = obj[leftPropName]
            const valueText = String(value).trim()

            if (isDefined(value) && valueText != '') {
                if (containsHTML(valueText)) result[htmlName] = valueText
                else result[textName] = valueText
            } else if (required) result[textName] = ''

            return result
        },
    }

    function containsHTML(str) {
        return /<([^>]+)>/.test(str)
    }
}
