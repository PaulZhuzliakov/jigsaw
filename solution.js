function solvePuzzle(pieces) {

    let firstElem = pieces[0];
    let firstElemEdges = getFirstElemEdges(pieces, firstElem.edges);

    //ушко правой стороны первого пазла
    let firstElemRightEdge = firstElemEdges[0];
    //ушко нижней стороны первого пазла
    let firstElemBottomEdge = firstElemEdges[1];

    let firstElemOfNextRowParams = getFirstElemOfNextRowParams(pieces, firstElemBottomEdge);
    let firstElemOfNextRowId = firstElemOfNextRowParams[0];
    let firstElemOfNextRowRightEdge = firstElemOfNextRowParams[1];
    let firstElemOfNextRowBottomEdge = firstElemOfNextRowParams[2];

    let resultArr = [];

    let oneRow = getOneRow(firstElem.id, firstElemRightEdge, pieces);

    for (let i of oneRow) {
        resultArr.push(i);
    }

    let elemId = firstElemOfNextRowId;
    let elemRightEdge = firstElemOfNextRowRightEdge;
    let nextRow = [];
    let counter = 0;

    let elemBottomEdge = firstElemOfNextRowBottomEdge;

    do {
        nextRow = getOneRow(elemId, elemRightEdge, pieces);
        for (let i of nextRow) {
            resultArr.push(i);
        }

        if (counter === 8) {
            break;
        }

        firstElemOfNextRowParams = getFirstElemOfNextRowParams(pieces, elemBottomEdge);
        elemId = firstElemOfNextRowParams[0];
        elemRightEdge = firstElemOfNextRowParams[1];
        elemBottomEdge = firstElemOfNextRowParams[2];

        counter++;
    } while (counter < 9) ;


    return resultArr;
}

//возвращает значения одного ряда
function getOneRow(firstElemId, rightEdgeOfFirstElem, pieces) {
    let oneRowArr = [];
    oneRowArr.push(firstElemId);
    let rightEdgeOfPrevElem = rightEdgeOfFirstElem;

    for (let i = 0; i < 9; i++) {
        let elemOfRowParams = getElemOfRowParams(pieces, rightEdgeOfPrevElem);
        let nextElemId = elemOfRowParams[0];
        let currElemRightEdge = elemOfRowParams[1];
        rightEdgeOfPrevElem = currElemRightEdge;
        oneRowArr.push(nextElemId);
    }
    return oneRowArr;
}

//возвращает ушки правой и нижней стороны первого элемента пазла
function getFirstElemEdges(pieces, edges) {
    let firstElemRightEdge;
    let firstElemBottomEdge;
    if (edges.top != null && edges.right != null) {
        firstElemRightEdge = edges.top;
        firstElemBottomEdge = edges.right;
    }
    if (edges.right != null && edges.bottom != null) {
        firstElemRightEdge = edges.right;
        firstElemBottomEdge = edges.bottom;
    }
    if (edges.bottom != null && edges.left != null) {
        firstElemRightEdge = edges.bottom;
        firstElemBottomEdge = edges.left;
    }
    if (edges.left != null && edges.top != null) {
        firstElemRightEdge = edges.left;
        firstElemBottomEdge = edges.top;
    }
    return [firstElemRightEdge, firstElemBottomEdge];
}

//возвращает параметры первого пазла следушего ряда по значению ушка нижней стороны текущего ряда
function getFirstElemOfNextRowParams(pieces, bottomEdgeOfPreviousElem) {
    let elemId;
    let rightEdge;
    let bottomEdge;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].edges.top != null) {
            if (bottomEdgeOfPreviousElem.edgeTypeId === pieces[i].edges.top.edgeTypeId
                && bottomEdgeOfPreviousElem.type != pieces[i].edges.top.type) {
                elemId = pieces[i].id;
                rightEdge = pieces[i].edges.right;
                bottomEdge = pieces[i].edges.bottom;
                break;
            }
        }
        if (pieces[i].edges.right != null) {
            if (bottomEdgeOfPreviousElem.edgeTypeId === pieces[i].edges.right.edgeTypeId
                && bottomEdgeOfPreviousElem.type != pieces[i].edges.right.type) {
                elemId = pieces[i].id;
                rightEdge = pieces[i].edges.bottom;
                bottomEdge = pieces[i].edges.left;
                break;
            }
        }
        if (pieces[i].edges.bottom != null) {
            if (bottomEdgeOfPreviousElem.edgeTypeId === pieces[i].edges.bottom.edgeTypeId
                && bottomEdgeOfPreviousElem.type != pieces[i].edges.bottom.type) {
                elemId = pieces[i].id;
                rightEdge = pieces[i].edges.left;
                bottomEdge = pieces[i].edges.top;
                break;
            }
        }
        if (pieces[i].edges.left != null) {
            if (bottomEdgeOfPreviousElem.edgeTypeId === pieces[i].edges.left.edgeTypeId
                && bottomEdgeOfPreviousElem.type != pieces[i].edges.left.type) {
                elemId = pieces[i].id;
                rightEdge = pieces[i].edges.top;
                bottomEdge = pieces[i].edges.right;
                break;
            }
        }
    }
    return [elemId, rightEdge, bottomEdge];
}

//возвращает элемент строки по ушку предъидущего элемента
function getElemOfRowParams(pieces, rightEdgeOfPrevElem) {
    let currElemId;
    let currElemRightEdge;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].edges.top != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.top.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.top.type) {
                currElemId = pieces[i].id;
                currElemRightEdge = pieces[i].edges.bottom;
                break;
            }
        }
        if (pieces[i].edges.right != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.right.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.right.type) {
                currElemId = pieces[i].id;
                currElemRightEdge = pieces[i].edges.left;
                break;
            }
        }
        if (pieces[i].edges.bottom != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.bottom.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.bottom.type) {
                currElemId = pieces[i].id;
                currElemRightEdge = pieces[i].edges.top;
                break;
            }
        }
        if (pieces[i].edges.left != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.left.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.left.type) {
                currElemId = pieces[i].id;
                currElemRightEdge = pieces[i].edges.right;
                break;
            }
        }

    }
    return [currElemId, currElemRightEdge];
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

