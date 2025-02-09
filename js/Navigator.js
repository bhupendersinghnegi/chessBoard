// This is the file that will control all the event that will happened in the application
import * as chessBoardUI from "./ChessBoardUI.js";
import { leftBoardContainer, rightBoardContainer } from "./Controller.js";
import { boardPieces, pieceMoves, selectedPlayer, selectedPlayerHandler } from "./GameJson.js";


function Navigator() {
    console.log("Navigator::")
    document.addEventListener("click", (Event) => {
        console.log("Clicked::")
        const targetElement = Event.target;
        if (targetElement.closest(".bg-selected")) {
            const column = targetElement.closest(".bg-selected");
            const columnNumber = +column.dataset.column;
            const rowNumber = +targetElement.closest(".row").dataset.row;
            const currentPiece = boardPieces[selectedPlayer];
            // Reset the boardPieces delete old  one and add now move
            const newLocation = `${rowNumber}_${columnNumber}`;
            boardPieces[newLocation] = currentPiece;
            delete boardPieces[selectedPlayer];

            // Reset the board  
            console.log(boardPieces)
            chessBoardUI["movePicesHander"]({ oldLocation: selectedPlayer, newLocation });
        } else if (targetElement.closest(".resetGame")) {
            ChessBoardUI({ boardSize: 8, leftBoardContainer, rightBoardContainer, container: boardContainer });
        } else if (targetElement.closest(".hasPiecs")) {
            const column = targetElement.closest(".hasPiecs");
            const playertype = column.dataset.playertype;
            chessBoardUI["resetSelectionHandler"]();
            // Call all the function that this piece can take
            pieceMoves[playertype].forEach(pieceFunction => {
                chessBoardUI[pieceFunction]({ selectedElement: column });
            });
        }

    })
}

export { Navigator }