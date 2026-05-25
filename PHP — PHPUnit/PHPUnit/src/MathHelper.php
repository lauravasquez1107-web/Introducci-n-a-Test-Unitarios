<?php

function add(int $a, int $b): int
{
    return $a + $b;
}

function divide(int $a, int $b): float
{
    if ($b === 0) {
        throw new \InvalidArgumentException('No se puede dividir entre cero.');
    }
    return $a / $b;
}