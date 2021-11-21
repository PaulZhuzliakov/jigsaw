function solvePuzzle(pieces) {

    const ROW_SIZE = 10;

    //ID ушка правой стороны первого пазла
    let rightEdgeOfFirstElem = getFirstElemEdgeIds(pieces[0].edges)[0];
    //ID ушка нижней стороны первого пазла
    let bottomEdgeOfFirstElem = getFirstElemEdgeIds(pieces[0].edges)[1];

    let resultArr = [];
    let firstElem = pieces[0].id;
    resultArr.push(firstElem);

    let i = 0;
    rightEdge = rightEdgeOfFirstElem;

    do {
        let temp = getElemOfRow(pieces, rightEdge);
        let nextElem = temp[0];
        let currElemEdge = temp[1];
        rightEdge = currElemEdge;
        resultArr.push(nextElem);

        i++;
    } while (i < ROW_SIZE-1);

    return resultArr;
}

//возвращает ID ушка правой и нижней стороны первого пазла
function getFirstElemEdgeIds(edges) {
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

