<?php

class PasswordValidator
{
    public function isValid(string $password): bool
    {
        if (strlen($password) < 8) return false;
        if (!preg_match('/[A-Z]/', $password)) return false;
        if (!preg_match('/[0-9]/', $password)) return false;
        return true;
    }

    public function getStrength(string $password): string
    {
        if (!$this->isValid($password)) return 'weak';
        if (strlen($password) >= 12 && preg_match('/[^a-zA-Z0-9]/', $password)) return 'strong';
        return 'medium';
    }
}

