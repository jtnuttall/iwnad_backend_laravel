<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterTest extends TestCase
{
    public function testRegistration()
    {
    	$this->json('POST', '/api/register', [
    		'email' => 'test@test.com',
    		'password' => 'unimportant',
    		'permissions' => 1,
    	])->assertJsonStructure([
    		'user' => [
    			'email',
    			'permissions',
    			'updated_at',
    			'created_at',
    			'userid',
    		],
    		'token',
    	]);
    }

    /**
     * Test that admin registration works properly
     *
     * @return void
     */
    public function testAdminRegistration()
    {
        $this->post('/api/register', [
        	'email' => 'testAdmin@admin.com',
        	'password' => 'adminPassword',
        	'permissions' => 0,
        	])->assertJson([
        		'user' => [
        			'email' => 'testAdmin@admin.com',
        			'permissions' => 0,
        		]
        	]);
    }

    /**
     * Test that mentor registration works properly
     *
     * @return void
     */
    public function testMentorRegistration()
    {
        $this->post('/api/register', [
        	'email' => 'testMentor@mentor.com',
        	'password' => 'mentorPassword',
        	'permissions' => 1,
        	])->assertJson([
        		'user' => [
        			'email' => 'testMentor@mentor.com',
        			'permissions' => 1,
        		]
        	]);
    }

    /**
     * Test that mentee registration works properly
     *
     * @return void
     */
    public function testMenteeRegistration()
    {
    	$this->post('/api/register', [
        	'email' => 'testMentee@mentee.com',
        	'password' => 'menteePassword',
        	'permissions' => 2,
        	])->assertJson([
        		'user' => [
        			'email' => 'testMentee@mentee.com',
        			'permissions' => 2,
        		]
        	]);
    }

    /**
     * Test incorrect password length
     * 
     * @return void
     */
    public function testIncorrectPasswordLength()
    {
    	$this->post('/api/register', [
    		'email' => 'insecure@insecurity.com',
    		'password' => 'short',
    		'permissions' => 2,
    	])->seeStatusCode(400);
    }
}
