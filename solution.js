function solvePuzzle(pieces) {

    const ROW_SIZE = 10;

    let firstElem = pieces[0];
    let firstElemEdges = getFirstElemEdges(pieces, firstElem.edges);

    //ушко правой стороны первого пазла
    let firstElemRightEdge = firstElemEdges[0];
    //ушко нижней стороны первого пазла
    let firstElemBottomEdge = firstElemEdges[1];

    //ушко правой стороны первого пазла следующего ряда
    let firstElemOfNextRowParams = getRightEdgeOfFirstElemOfNextRow(pieces, firstElemBottomEdge);
    let firstElemOfNextRowId = firstElemOfNextRowParams[0];
    let firstElemOfNextRowRightEdge = firstElemOfNextRowParams[1];
    let firstElemOfNextRowBottomEdge = firstElemOfNextRowParams[2];

    let resultArr = [];


    let oneRow = getOneRow(firstElem.id, firstElemRightEdge, pieces);

    for (let i of oneRow) {
        resultArr.push(i);
    }

    let tempParams;
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


        if (counter > 7) {
            break;
        }

        tempParams = getRightEdgeOfFirstElemOfNextRow(pieces, elemBottomEdge);
        elemId = tempParams[0];
        elemRightEdge = tempParams[1];

        elemBottomEdge = tempParams[2];

        counter++;
    } while (counter < 9) ;


    return resultArr;
}

//возвращает значения одного ряда
function getOneRow(firstElemId, rightEdgeOfFirstElem, pieces) {
    let oneRowArr = [];
    oneRowArr.push(firstElemId);

    let rowElementCounter = 0;
    let rightEdge = rightEdgeOfFirstElem;
    do {
        let temp = getElemOfRow(pieces, rightEdge);
        let nextElem = temp[0];
        let currElemEdge = temp[1];
        rightEdge = currElemEdge;
        oneRowArr.push(nextElem);

        rowElementCounter++;
    } while (rowElementCounter < 9);

    return oneRowArr;
}

//возвращает ушки правой и нижней стороны первого пазла
function getFirstElemEdges(pieces, edges) {
    let rightEdge;
    let bottomEdge;
    if (edges.top != null && edges.right != null) {
        rightEdge = edges.top;
        bottomEdge = edges.right;
    }
    if (edges.right != null && edges.bottom != null) {
        rightEdge = edges.right;
        bottomEdge = edges.bottom;
    }
    if (edges.bottom != null && edges.left != null) {
        rightEdge = edges.bottom;
        bottomEdge = edges.left;
    }
    if (edges.left != null && edges.top != null) {
        rightEdge = edges.left;
        bottomEdge = edges.top;
    }
    return [rightEdge, bottomEdge];
}

//возвращает ушко правой стороны первого пазла следушего ряда по значению ушка нижней стороны текущего ряда
function getRightEdgeOfFirstElemOfNextRow(pieces, bottomEdgeOfPreviousElem) {
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
function getElemOfRow(pieces, rightEdgeOfPrevElem) {
    let elemId;
    let rightEdgeOfCurrElem;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].edges.top != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.top.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.top.type) {
                elemId = pieces[i].id;
                rightEdgeOfCurrElem = pieces[i].edges.bottom;
                break;
            }
        }
        if (pieces[i].edges.right != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.right.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.right.type) {
                elemId = pieces[i].id;
                rightEdgeOfCurrElem = pieces[i].edges.left;
                break;
            }
        }
        if (pieces[i].edges.bottom != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.bottom.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.bottom.type) {
                elemId = pieces[i].id;
                rightEdgeOfCurrElem = pieces[i].edges.top;
                break;
            }
        }
        if (pieces[i].edges.left != null) {
            if (rightEdgeOfPrevElem.edgeTypeId === pieces[i].edges.left.edgeTypeId
                && rightEdgeOfPrevElem.type != pieces[i].edges.left.type) {
                elemId = pieces[i].id;
                rightEdgeOfCurrElem = pieces[i].edges.right;
                break;
            }
        }

    }
    return [elemId, rightEdgeOfCurrElem];
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

