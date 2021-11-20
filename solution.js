function solvePuzzle(pieces) {

  let firstElemRightEdgeTypeId = getRightEdgeId(pieces[0].edges);

  let nextElemId;

  for (var i = 1; i < pieces.length; i++) {

    if (pieces[i].edges.top != null) {
      if (firstElemRightEdgeTypeId == pieces[i].edges.top.edgeTypeId) {
        nextElemId = pieces[i].id;
        break;
      }
    }
    if (pieces[i].edges.right != null) {
      if (firstElemRightEdgeTypeId == pieces[i].edges.right.edgeTypeId) {
        nextElemId = pieces[i].id;
        break;
      }
    }
    if (pieces[i].edges.bottom != null) {
      if (firstElemRightEdgeTypeId == pieces[i].edges.bottom.edgeTypeId) {
        nextElemId = pieces[i].id;
        break;
      }
    }
    if (pieces[i].edges.left != null) {
      if (firstElemRightEdgeTypeId == pieces[i].edges.left.edgeTypeId) {
        nextElemId = pieces[i].id;
        break;
      }
    }
  }

  return [pieces[0].id, nextElemId];

}

function getRightEdgeId(edges) {
  let rightEdgeId;
  if (edges.top != null && edges.right != null) {
    rightEdgeId = edges.top.edgeTypeId;
  }
  if (edges.right != null && edges.bottom != null) {
    rightEdgeId = edges.right.edgeTypeId;
  }
  if (edges.bottom != null && edges.left != null) {
    rightEdgeId = edges.bottom.edgeTypeId;
  }
  if (edges.left != null && edges.top != null) {
    rightEdgeId = edges.left.edgeTypeId;
  }
  return rightEdgeId;
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

