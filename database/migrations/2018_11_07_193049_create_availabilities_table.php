<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAvailabilitiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('availabilities', function(Blueprint $table)
		{
			$table->increments('availabilityid');
			$table->integer('dashboardid')->index('fk_availabilities_dashboards1_idx');
			$table->dateTime('begindate');
			$table->dateTime('enddate')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('availabilities');
	}

}
