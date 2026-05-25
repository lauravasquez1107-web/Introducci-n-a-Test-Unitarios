<?php

class StringHelper
{
    public function truncate(string $text, int $maxLength, string $suffix = '...'): string
    {
        if ($maxLength <= 0) {
            throw new \InvalidArgumentException('maxLength debe ser mayor que 0.');
        }

        if (mb_strlen($text) <= $maxLength) {
            return $text;
        }

        return mb_substr($text, 0, $maxLength) . $suffix;
    }

    public function toSlug(string $text): string
    {
        $text = mb_strtolower($text, 'UTF-8');
        $text = preg_replace('/[^a-z0-9\s-]/u', '', $text);
        $text = preg_replace('/\s+/', '-', trim($text));
        return $text;
    }

    public function countWords(string $text): int
    {
        $text = trim($text);
        if ($text === '') {
            return 0;
        }
        return count(preg_split('/\s+/', $text));
    }
}