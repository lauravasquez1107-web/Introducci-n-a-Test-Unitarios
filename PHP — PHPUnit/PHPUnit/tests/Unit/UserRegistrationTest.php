<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserRegistrationTest extends TestCase
{
    use RefreshDatabase; // Resetea la BD en cada test (usa SQLite en memoria)

    public function test_user_can_register_with_valid_data(): void
    {
        // Act — hacer un POST a la ruta de registro
        $response = $this->postJson('/api/register', [
            'name'                  => 'Ana García',
            'email'                 => 'ana@ejemplo.com',
            'password'              => 'Secret123!',
            'password_confirmation' => 'Secret123!',
        ]);

        // Assert — la respuesta HTTP debe ser 201 Created
        $response->assertStatus(201)
                 ->assertJsonStructure(['user' => ['id', 'name', 'email']]);

        // Verificar que el usuario existe en la BD de prueba
        $this->assertDatabaseHas('users', ['email' => 'ana@ejemplo.com']);
    }

    public function test_registration_fails_with_duplicate_email(): void
    {
        // Arrange — crear un usuario previo con ese email
        User::factory()->create(['email' => 'duplicado@ejemplo.com']);

        $response = $this->postJson('/api/register', [
            'name'                  => 'Otro Usuario',
            'email'                 => 'duplicado@ejemplo.com',
            'password'              => 'Secret123!',
            'password_confirmation' => 'Secret123!',
        ]);

        $response->assertStatus(422)         // Unprocessable Entity
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_authenticated_user_can_see_profile(): void
    {
        // Arrange — actuar como un usuario autenticado
        $user = User::factory()->create();

        // Act — petición autenticada
        $response = $this->actingAs($user)->getJson('/api/profile');

        $response->assertStatus(200)
                 ->assertJson(['email' => $user->email]);
    }
}