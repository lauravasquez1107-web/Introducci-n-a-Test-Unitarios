<?php

use PHPUnit\Framework\TestCase;

class PasswordValidatorTest extends TestCase
{
    private PasswordValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new PasswordValidator();
    }

    /**
     * @dataProvider invalidPasswordProvider
     */
    public function test_invalid_passwords_are_rejected(string $password, string $reason): void
    {
        $this->assertFalse(
            $this->validator->isValid($password),
            "Debería ser inválido porque: $reason"
        );
    }

    // Los DataProviders devuelven arrays de [argumentos...]
    public static function invalidPasswordProvider(): array
    {
        return [
            'muy corta'          => ['Ab1',      'menos de 8 caracteres'],
            'sin mayúscula'      => ['abcdef12',  'no tiene mayúscula'],
            'sin número'         => ['AbcdefGH',  'no tiene dígito'],
            'completamente vacía'=> ['',           'vacía'],
        ];
    }

    /**
     * @dataProvider strengthProvider
     */
    public function test_password_strength(string $password, string $expected): void
    {
        $this->assertEquals($expected, $this->validator->getStrength($password));
    }

    public static function strengthProvider(): array
    {
        return [
            ['Abc12345',          'medium'],
            ['MyP@ssw0rd!2024',   'strong'],
            ['simple',            'weak'],
        ];
    }
}