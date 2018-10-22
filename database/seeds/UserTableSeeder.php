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
		$zeroemail = env('ADMIN_EMAIL', "abarman@usc.edu");
		$zeropass = Hash::make(env('ADMIN_PASSWORD', "iwnadCS401"));

		$zerouser = new User();
		$zerouser->email = env('ADMIN_EMAIL', "abarman@usc.edu");
		$zerouser->password = Hash::make(env('ADMIN_PASSWORD', "iwnadCS401"));
		$zerouser->permissions = 0;
		$zerouser->name = 'Avni';
		$zerouser->save();
    }
}
