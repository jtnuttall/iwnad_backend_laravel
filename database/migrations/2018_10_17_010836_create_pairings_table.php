<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePairingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pairings', function(Blueprint $table)
		{
			$table->integer('pairingid', true);
			$table->integer('mentorid')->index('fk_pairings_users_idx');
			$table->integer('menteeid')->index('fk_pairings_users1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('pairings');
	}

}
