<?php
/**
 * I didn't wrapped this library as a service cause I don't really need the whole
 * dependency injection and singleton logic for such as simple class without deps.
 */

namespace App\Libraries;


class ShipsMapper
{
    protected array $map = [];

    protected array $shipsAvailable = [
        'battleship'    => 5,
        'destroyer_1'   => 4,
        'destroyer_2'   => 4
    ];

    protected int $rows;

    protected int $cols;

    /**
     * ShipsMapper constructor.
     *
     * @param int $rows Rows of the battle field
     * @param int $cols Cols of the battle field
     */
    public function __construct(int $rows = 10, int $cols = 10)
    {
        $this->rows = $rows;
        $this->cols = $cols;
    }

    /**
     * @param string $ship Ship's name
     * @param int $size Ship's size
     *
     * @return bool
     */
    private function placeShip(string $ship, int $size):bool {
        $rows = $this->rows;
        $cols = $this->cols;

        $randomSquare = rand(1, 100);

        if (isset($map[$randomSquare])) {
            return $this->placeShip($ship, $size);
        }

        $row = ceil($randomSquare / 10);
        $possiblePositions = [];

        /**
         * Check if there are enough squares to place the ship
         * horizontally (left or right from the randomly chosen starting point) and
         * vertically (top or bottom from the starting point).
         * Then, shuffle the possibilities and check if there is an overlap with other ships.
         * Choose the first available positions
         */

        // left
        if ($randomSquare - $size + 1 >= ($row * $cols) - ($cols - 1)) {
            $possiblePositions['left'] = [$randomSquare - $size + 1, $randomSquare, 1];
        }

        // right
        if ($randomSquare + $size - 1 <= $row * $cols) {
            $possiblePositions['right'] = [$randomSquare, $randomSquare + $size - 1, 1];
        }

        // up
        if ($randomSquare - (($size - 1) * $rows) >= 1) {
            $possiblePositions['up'] = [$randomSquare - (($size - 1) * 10), $randomSquare, 10];
        }

        // down
        if ($randomSquare + (($size - 1) * 10) <= $rows * $cols) {
            $possiblePositions['down'] = [$randomSquare, $randomSquare + (($size - 1) * 10), 10];
        }

        shuffle($possiblePositions);

        foreach ($possiblePositions as $position) {
            list($start, $end, $step) = $position;
            $squares = range($start, $end, $step);
            if (!count(array_intersect(array_keys($this->map), $squares))) {
                foreach ($squares as $square) {
                    $this->map[$square] = $ship;
                }
                return true;
            }
        }

        return $this->placeShip($ship, $size);
    }

    /**
     * @return array Map of the squares occupied by ships
     */
    public function getMap():array {
        if (!count($this->map)) {
            foreach ($this->shipsAvailable as $ship => $size) {
                $this->placeShip($ship, $size);
            }
        }
        return $this->map;
    }
}
