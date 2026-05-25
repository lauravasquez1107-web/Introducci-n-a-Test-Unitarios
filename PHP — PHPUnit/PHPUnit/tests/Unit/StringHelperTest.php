<?php

use PHPUnit\Framework\TestCase;

class StringHelperTest extends TestCase
{
    private StringHelper $helper;

    protected function setUp(): void
    {
        $this->helper = new StringHelper();
    }

    // --- truncate ---

    public function test_truncate_returns_original_when_short_enough(): void
    {
        $result = $this->helper->truncate('Hola', 10);
        $this->assertEquals('Hola', $result);
    }

    public function test_truncate_exactly_at_limit_returns_original(): void
    {
        $result = $this->helper->truncate('Hola', 4);
        $this->assertEquals('Hola', $result);
    }

    public function test_truncate_cuts_and_adds_suffix(): void
    {
        $result = $this->helper->truncate('Hola Mundo', 4);
        $this->assertEquals('Hola...', $result);
    }

    public function test_truncate_uses_custom_suffix(): void
    {
        $result = $this->helper->truncate('Hola Mundo', 4, ' →');
        $this->assertEquals('Hola →', $result);
    }

    public function test_truncate_throws_when_max_length_is_zero(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->helper->truncate('Hola', 0);
    }

    public function test_truncate_throws_when_max_length_is_negative(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->helper->truncate('Hola', -5);
    }

    // --- toSlug ---

    public function test_to_slug_converts_spaces_to_hyphens(): void
    {
        $result = $this->helper->toSlug('Hola Mundo');
        $this->assertEquals('hola-mundo', $result);
    }

    public function test_to_slug_removes_special_characters(): void
    {
        $result = $this->helper->toSlug('¡Hola Mundo! 2024');
        $this->assertEquals('hola-mundo-2024', $result);
    }

    public function test_to_slug_handles_multiple_spaces(): void
    {
        $result = $this->helper->toSlug('hola   mundo');
        $this->assertEquals('hola-mundo', $result);
    }

    public function test_to_slug_returns_empty_string_when_empty(): void
    {
        $result = $this->helper->toSlug('');
        $this->assertEquals('', $result);
    }

    // --- countWords ---

    public function test_count_words_returns_correct_count(): void
    {
        $result = $this->helper->countWords('Hola Mundo PHP');
        $this->assertEquals(3, $result);
    }

    public function test_count_words_handles_multiple_spaces(): void
    {
        $result = $this->helper->countWords('Hola   Mundo');
        $this->assertEquals(2, $result);
    }

    public function test_count_words_returns_zero_for_empty_string(): void
    {
        $result = $this->helper->countWords('');
        $this->assertEquals(0, $result);
    }

    public function test_count_words_returns_zero_for_only_spaces(): void
    {
        $result = $this->helper->countWords('     ');
        $this->assertEquals(0, $result);
    }
}
