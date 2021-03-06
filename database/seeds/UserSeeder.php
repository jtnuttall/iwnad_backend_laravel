<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$baseadmin = new User();
		$baseadmin->email = env('ADMIN_EMAIL', 'abarman@usc.edu');
        $baseadmin->username = env('ADMIN_EMAIL', 'abarman@usc.edu');
		$baseadmin->password = Hash::make(env('ADMIN_PASSWORD', 'abarman'));
		$baseadmin->permissions = env('ADMIN_PERMISSIONS', 0);
		$baseadmin->name = 'Avni';
        $baseadmin->firstlogin = false;
		$baseadmin->save();
    }
}
