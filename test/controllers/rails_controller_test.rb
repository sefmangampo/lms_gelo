require "test_helper"

class RailsControllerTest < ActionDispatch::IntegrationTest
  test "should get g" do
    get rails_g_url
    assert_response :success
  end

  test "should get controller" do
    get rails_controller_url
    assert_response :success
  end

  test "should get api/v1/Reports" do
    get rails_api/v1/Reports_url
    assert_response :success
  end

  test "should get generate" do
    get rails_generate_url
    assert_response :success
  end
end
