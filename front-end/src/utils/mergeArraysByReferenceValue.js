const mergeArraysByReferenceValue = (arr1, arr2, valRef) => {
  const updatedArray = arr1.map((itemTable1) => {
    const matchingObj2 = arr2.find((itemTable2) => itemTable1[valRef] === itemTable2[valRef])

    return matchingObj2 ? { ...itemTable1, ...matchingObj2 } : itemTable1
  })

  return updatedArray
}

export default mergeArraysByReferenceValue
