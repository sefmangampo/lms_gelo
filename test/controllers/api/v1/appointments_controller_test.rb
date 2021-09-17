require "test_helper"

class Api::V1::AppointmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_appointments_index_url
    assert_response :success
  end
end
