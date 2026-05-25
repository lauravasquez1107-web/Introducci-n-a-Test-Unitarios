<?php

use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    private Calculator $calc;

    // setUp() se ejecuta ANTES de cada método de test
    protected function setUp(): void
    {
        parent::setUp();
        $this->calc = new Calculator();
    }

    public function test_add_two_positive_numbers(): void
    {
        $result = $this->calc->add(10, 5);
        $this->assertEquals(15, $result);
    }

    public function test_subtract_returns_negative_when_b_is_greater(): void
    {
        $result = $this->calc->subtract(3, 10);
        $this->assertEquals(-7, $result);
    }

    public function test_history_records_operations(): void
    {
        $this->calc->add(2, 3);
        $this->calc->subtract(10, 4);

        $history = $this->calc->getHistory();

        $this->assertCount(2, $history);
        $this->assertStringContainsString('2 + 3 = 5', $history[0]);
    }

    public function test_clear_history_empties_records(): void
    {
        $this->calc->add(1, 1);
        $this->calc->clearHistory();

        $this->assertEmpty($this->calc->getHistory());
    }
}