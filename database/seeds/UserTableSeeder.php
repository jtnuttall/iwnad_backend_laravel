<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$baseadmin = new User();
		$baseadmin->email = env('ADMIN_EMAIL', "abarman@usc.edu");
		$baseadmin->password = Hash::make(env('ADMIN_PASSWORD', "iwnadCS401"));
		$baseadmin->permissions = 0;
		$baseadmin->name = 'Avni';
		$baseadmin->save();
    }
}
