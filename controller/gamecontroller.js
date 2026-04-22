import Game from "../models/gameModel.js";


export const GameResult = async (req, res) => {
    try {
        const { player1Name, player2Name, player1Score, player2Score } = req.body;
        const winnerPlayerName = player1Score > player2Score ? player1Name : player2Name;

        const game = await Game.create({
            player1Name,
            player2Name,
            player1Score,
            player2Score,
            winnerPlayerName,
        });

        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};