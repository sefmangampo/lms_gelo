require "test_helper"

class Api::V1::LeaveAccrualSettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leave_accrual_settings_index_url
    assert_response :success
  end
end
