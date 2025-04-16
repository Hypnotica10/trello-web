/**
 * Creates a mapping of elements from `arrResult` to their indices for sorting purposes.
 *
 * @param {Array} arrOriginal - The original array of elements.
 * @param {Array} arrResult - The array containing the desired order of elements.
 * @param {string} key - The key used to identify elements in the arrays.
 * @returns {Map} A Map where keys are elements from `arrResult` and values are their indices.
 */
export const sortObjectByOrder = (arrSource, arrDestination, key) => {
    if (!arrSource.length || !arrDestination.length || !key) return [];
    const orderMap = new Map();
    arrDestination.forEach((element, index) => {
        orderMap.set(element, index)
    });
    const cloneSource = [...arrSource];
    const result = cloneSource.sort((a, b) => (orderMap.get(a[key]) ?? Infinity) - (orderMap.get(b[key]) ?? Infinity));
    return result;
}
