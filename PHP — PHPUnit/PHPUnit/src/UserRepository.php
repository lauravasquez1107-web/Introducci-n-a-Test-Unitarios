<?php

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function save(array $userData): bool;
}