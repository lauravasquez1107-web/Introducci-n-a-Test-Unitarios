<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../src/MathHelper.php';

class MathHelperTest extends TestCase
{
    // Arrange + Act + Assert en un solo test conciso
    public function test_add_returns_correct_sum(): void
    {
        // Arrange
        $a = 2;
        $b = 3;

        // Act
        $result = add($a, $b);

        // Assert
        $this->assertEquals(5, $result);
    }

    public function test_divide_returns_float(): void
    {
        $this->assertEquals(2.5, divide(5, 2));
    }

    // Probar que una excepción se lanza correctamente
    public function test_divide_by_zero_throws_exception(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('No se puede dividir entre cero.');

        divide(10, 0);
    }
}