<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDashboardsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dashboards', function(Blueprint $table)
		{
			$table->integer('dashboardid', true);
			$table->dateTime('meetingtime')->nullable();
			$table->integer('pairingid')->index('fk_dashboards_pairings1_idx');
			$table->integer('currentphaseid');
			$table->integer('currentphasestatus');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dashboards');
	}

}
